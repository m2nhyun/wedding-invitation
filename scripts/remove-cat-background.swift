#!/usr/bin/env swift

import CoreImage
import Foundation
import UniformTypeIdentifiers
import Vision

enum CutoutError: Error, CustomStringConvertible {
  case usage
  case unreadableImage(String)
  case noForeground(String)

  var description: String {
    switch self {
    case .usage:
      return "Usage: remove-cat-background.swift <input-image> <output-png> [instance-number]"
    case .unreadableImage(let path):
      return "Could not read image: \(path)"
    case .noForeground(let path):
      return "No foreground subject was detected: \(path)"
    }
  }
}

func makeCutout(
  inputPath: String,
  outputPath: String,
  instanceNumber: Int?
) throws {
  let inputURL = URL(fileURLWithPath: inputPath)
  let outputURL = URL(fileURLWithPath: outputPath)

  guard let inputImage = CIImage(
    contentsOf: inputURL,
    options: [.applyOrientationProperty: true]
  ) else {
    throw CutoutError.unreadableImage(inputPath)
  }

  let request = VNGenerateForegroundInstanceMaskRequest()
  let handler = VNImageRequestHandler(ciImage: inputImage)
  try handler.perform([request])

  guard
    let result = request.results?.first,
    !result.allInstances.isEmpty
  else {
    throw CutoutError.noForeground(inputPath)
  }

  let instances: IndexSet

  if let instanceNumber {
    let detectedInstances = Array(result.allInstances)

    guard detectedInstances.indices.contains(instanceNumber - 1) else {
      throw CutoutError.noForeground(
        "\(inputPath) (requested instance \(instanceNumber), detected \(detectedInstances.count))"
      )
    }

    instances = IndexSet(integer: detectedInstances[instanceNumber - 1])
  } else {
    instances = result.allInstances
  }

  let maskedBuffer = try result.generateMaskedImage(
    ofInstances: instances,
    from: handler,
    croppedToInstancesExtent: true
  )
  let cutout = CIImage(cvPixelBuffer: maskedBuffer)

  try FileManager.default.createDirectory(
    at: outputURL.deletingLastPathComponent(),
    withIntermediateDirectories: true
  )

  let context = CIContext()
  let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)!

  try context.writePNGRepresentation(
    of: cutout,
    to: outputURL,
    format: .RGBA8,
    colorSpace: colorSpace
  )
}

do {
  guard (3...4).contains(CommandLine.arguments.count) else {
    throw CutoutError.usage
  }

  try makeCutout(
    inputPath: CommandLine.arguments[1],
    outputPath: CommandLine.arguments[2],
    instanceNumber: CommandLine.arguments.count == 4
      ? Int(CommandLine.arguments[3])
      : nil
  )
} catch {
  FileHandle.standardError.write(Data("\(error)\n".utf8))
  exit(1)
}

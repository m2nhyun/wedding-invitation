#!/usr/bin/env swift

import AVFoundation
import Foundation
import ImageIO
import UniformTypeIdentifiers

enum FrameError: Error, CustomStringConvertible {
  case usage
  case imageDestination(String)

  var description: String {
    switch self {
    case .usage:
      return "Usage: extract-video-frames.swift <input-video> <output-directory> [interval-seconds]"
    case .imageDestination(let path):
      return "Could not create image destination: \(path)"
    }
  }
}

func writePNG(_ image: CGImage, to outputURL: URL) throws {
  guard
    let destination = CGImageDestinationCreateWithURL(
      outputURL as CFURL,
      UTType.png.identifier as CFString,
      1,
      nil
    )
  else {
    throw FrameError.imageDestination(outputURL.path)
  }

  CGImageDestinationAddImage(destination, image, nil)
  CGImageDestinationFinalize(destination)
}

do {
  guard (3...4).contains(CommandLine.arguments.count) else {
    throw FrameError.usage
  }

  let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
  let outputDirectory = URL(fileURLWithPath: CommandLine.arguments[2])
  let interval = CommandLine.arguments.count == 4
    ? max(Double(CommandLine.arguments[3]) ?? 5, 0.1)
    : 5

  try FileManager.default.createDirectory(
    at: outputDirectory,
    withIntermediateDirectories: true
  )

  let asset = AVURLAsset(url: inputURL)
  let duration = try await asset.load(.duration).seconds
  let generator = AVAssetImageGenerator(asset: asset)
  generator.appliesPreferredTrackTransform = true
  generator.requestedTimeToleranceBefore = .zero
  generator.requestedTimeToleranceAfter = .zero

  var second = 0.0

  while second < duration {
    let time = CMTime(seconds: second, preferredTimescale: 600)
    let image = try generator.copyCGImage(at: time, actualTime: nil)
    let filename = String(format: "frame-%06.2f.png", second)

    try writePNG(image, to: outputDirectory.appendingPathComponent(filename))
    second += interval
  }
} catch {
  FileHandle.standardError.write(Data("\(error)\n".utf8))
  exit(1)
}

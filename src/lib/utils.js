import { clsx } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * @description Generate a random unique id
 * @param {number} length - Length of the nanoid
 * @param {string} prefix - Add prefix to the ID
 * @returns {string} Random Id of desired length and prefix
 */

export function generate_nanoId(length, prefix) {
  const length_to_generate = length - prefix.length
  const nanoid = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    length_to_generate
  )
  return `${prefix}${nanoid()}`
}

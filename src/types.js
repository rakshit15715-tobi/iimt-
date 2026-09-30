/**
 * Documentation-only module: JavaScript project, so the shapes below are JSDoc typedefs rather
 * than runtime code. Editors pick them up for autocomplete; nothing here is bundled.
 *
 * @typedef {"brand" | "accent" | "gold" | "neutral"} Tone
 *
 * @typedef {object} GlassCard
 * @property {string} ariaLabel accessible name, e.g. "All Faculties, 6 cards"
 *
 * @typedef {object} Program
 * @property {string} id
 * @property {string} filter          tab-filter key (see PROGRAM_FILTERS)
 * @property {string} faculty
 * @property {string} degree
 * @property {Tone} tone
 * @property {import("react").ComponentType<{ size?: number }>} Icon
 * @property {string} blurb
 * @property {string[]} courses
 * @property {string} action
 *
 * @typedef {object} StatItem
 * @property {string} id
 * @property {number} value            numeric target for the count-up animation
 * @property {string} suffix           rendered after the animated number ("+", " LPA", "%")
 * @property {string} label
 * @property {string} hint
 * @property {Tone} tone
 * @property {import("react").ComponentType<{ size?: number }>} Icon
 *
 * @typedef {object} GalleryItem
 * @property {string} id
 * @property {string} src              BASE_URL-aware URL from assetUrl()
 * @property {number} width            intrinsic pixel width (prevents layout shift)
 * @property {number} height           intrinsic pixel height
 * @property {string} title
 * @property {string} story
 * @property {string} tag
 *
 * @typedef {object} CampusEvent
 * @property {string} id
 * @property {string} title
 * @property {string} date             ISO "YYYY-MM-DD"
 * @property {string} time
 * @property {string} venue
 * @property {string} category
 * @property {Tone} tone
 * @property {import("react").ComponentType<{ size?: number }>} Icon
 * @property {string} description
 *
 * @typedef {object} NavLink
 * @property {string} id               matches the section id for scroll-spy
 * @property {string} label
 * @property {string} href
 *
 * @typedef {object} EnquiryValues
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} category
 * @property {string} program
 * @property {string} qualification
 * @property {string} stream
 * @property {string} state
 * @property {string} city
 * @property {boolean} consent
 *
 * @typedef {object} EnquiryValidation
 * @property {boolean} valid
 * @property {Record<string, string>} errors  field name -> message (empty when valid)
 */

export {};

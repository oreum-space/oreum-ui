export type OCollapseModelValue = boolean

type Timeout = number | `${ number }`

export interface OCollapseProps {
  class?: string | null,
  timeout?: Timeout | [Timeout, Timeout],
  opened?: boolean,
  initial?: boolean
}

export interface OCollapseEmits {
  'close': [],
  'open': [],
  'toggle': [event: boolean]
}

export interface OCollapseSlots {
  default (props: never): unknown
}

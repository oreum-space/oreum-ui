import EmptyObject from '@lib/utils/EmptyObject.ts'

export type OCollapseModelValue = boolean

type Timeout = number | `${ number }`;

export interface OCollapseProps {
  class?: string | null,
  timeout?: Timeout | [Timeout, Timeout],
  opened?: boolean,
  initial?: boolean,
  horizontal?: boolean,
  end?: boolean
}

export type OCollapseEmits = {
  close: [],
  open: [],
  toggle: [event: boolean]
}

export type OCollapseSlots = {
  default (props: EmptyObject): unknown
}

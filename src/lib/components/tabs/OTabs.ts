import { ClassProps } from '@lib/utils/ClassProps.ts'

export type OTabsModelValue<TabIds extends string> = TabIds | undefined

export interface OTabsTab<TabIds extends string> {
  id: TabIds
  label: string
  disabled?: string
}

export interface OTabsProps<TabIds extends string> extends ClassProps {
  tabs?: Array<OTabsTab<TabIds>>
}

export type OTabsSlots <TabsIds extends string> = {
  default: (props: { tab: OTabsTab<TabsIds> }) => unknown
} & {
  [key in `tab-${ TabsIds }`]: (props: { tab: OTabsTab<TabsIds> }) => unknown
}

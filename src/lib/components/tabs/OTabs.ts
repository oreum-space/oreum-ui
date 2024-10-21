import { ClassProps } from '@lib/utils/ClassProps.ts'

export type OTabsModelValue<TabIds extends string | number | symbol> = TabIds | undefined

export interface OTabsTab<TabIds extends string | number | symbol> {
  id: TabIds,
  label: string
  disabled?: string
}

export interface OTabsProps<TabIds extends string | number | symbol> extends ClassProps {
  tabs?: Array<OTabsTab<TabIds>>
}

export type OTabsSlots<TabsIds extends string | number | symbol> = {
  default (props: { tab: OTabsTab<TabsIds> }): unknown
  [index: `tab-${ TabsIds }`]: (props: { tab: OTabsTab<TabsIds> }) => unknown
}

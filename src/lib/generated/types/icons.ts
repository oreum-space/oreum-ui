const icons = [
  'arrow',
  'bell',
  'blind',
  'cancel',
  'check',
  'close',
  'component',
  'components',
  'copied',
  'copy',
  'cube',
  'default',
  'delete',
  'down',
  'edit',
  'eye',
  'gear',
  'home',
  'indeterminate',
  'install',
  'left',
  'lock',
  'message',
  'minimize',
  'package-add',
  'package',
  'plus',
  'refresh',
  'right',
  'save',
  'search',
  'up',
  'upload',
  'user',
  'users'
] as const

export enum OIconNames {
  arrow = 'arrow',
  bell = 'bell',
  blind = 'blind',
  cancel = 'cancel',
  check = 'check',
  close = 'close',
  component = 'component',
  components = 'components',
  copied = 'copied',
  copy = 'copy',
  cube = 'cube',
  default = 'default',
  delete = 'delete',
  down = 'down',
  edit = 'edit',
  eye = 'eye',
  gear = 'gear',
  home = 'home',
  indeterminate = 'indeterminate',
  install = 'install',
  left = 'left',
  lock = 'lock',
  message = 'message',
  minimize = 'minimize',
  packageAdd = 'package-add',
  package = 'package',
  plus = 'plus',
  refresh = 'refresh',
  right = 'right',
  save = 'save',
  search = 'search',
  up = 'up',
  upload = 'upload',
  user = 'user',
  users = 'users'
}

export type OIconName = (typeof icons)[number]

export default icons

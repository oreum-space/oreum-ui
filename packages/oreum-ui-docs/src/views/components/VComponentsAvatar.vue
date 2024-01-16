<template>
  <o-card
    tag="section"
    clear
  >
    <h1>
      Avatar
    </h1>
    <p>
      The Avatar component is used to represent a user,
      display profile image or username with ability to with the ability to go to the user profile page.
    </p>
    <o-divider />
    <h2>
      Imports
    </h2>
    <p>
      OreumUI exports 2 avatar-related components:
    </p>
    <ul>
      <li>
        Avatar: The main component to display an avatar
      </li>
      <li>
        AvatarGroup: The main component to display an avatar
      </li>
    </ul>
    <o-avatar
      size="small"
      username="Username"
      src="/test.png"
    />
    <o-avatar
      username="Username"
      src="/test.png"
    />
    <o-avatar
      size="large"
      username="Username"
      src="/test.png"
    />
  </o-card>
</template>

<script
  setup
  lang="ts"
>
import {
  OAvatar,
  ODivider,
  OCard
} from 'oreum-ui'
</script>

<style lang="scss">

</style>
<script setup lang="ts">
import { RouteLocationRaw, useRoute } from 'vue-router'
import { Ref, ref } from 'vue'
import AppSvg from '@/components/app/AppSvg.vue'
import { OCollapse } from '@lib/oreum-ui'

interface DocMenuItemBase {
  name: string
}

interface DocMenuItemIcon extends DocMenuItemBase {
  icon: string
}

interface DocMenuItemChild extends DocMenuItemBase {
  route: RouteLocationRaw
}

interface DocMenuItemLink extends DocMenuItemIcon {
  route: RouteLocationRaw
}

interface DocMenuItemParent extends DocMenuItemIcon {
  children: DocMenuItemChild,
  opened: Ref<boolean>
}

type DocMenuItem = DocMenuItemParent | DocMenuItemLink

function createComponentRoute <Name extends string>(name: Name) {
  return {
    name,
    route: `/${ name.toLowerCase() }`
  }
}

const route = useRoute()

const items: Array<DocMenuItem> = [
  {
    name: 'Setup',
    icon: 'setup',
    route: '/setup'
  },
  {
    name: 'Component',
    icon: 'component',
    children: [
      createComponentRoute('Button'),
      createComponentRoute('Collapse')
    ],
    opened: ref(false)
  }
]

function toggle (item: DocMenuItemParent) {
  item.opened.value = !item.opened.value
}

(function findCurrentItemAndOpen() {
  for (const item of items) {
    'opened' in item && item.children.find(child => (child.route === route.path)) && void (item.opened.value = !item.opened.value)
  }
})()
</script>

<template>
  <menu class="doc-menu">
    <template v-for="item of items">
      <template v-if="'children' in item">
        <li>
          <a
            tabindex="0"
            role="button"
            class="doc-menu__item doc-menu__item_parent"
            @click="toggle(item)"
          >
            <div class="doc-menu__icon">
              <app-svg href="" />
            </div>
            <span class="doc-menu__item-text">
              {{ item.name }}
            </span>
            <div class="doc-menu__arrow">
              🔽
            </div>
          </a>
        </li>
        <li>
          <OCollapse
            class="doc-menu__collapse"
            :model-value="item.opened.value"
          >
            <ul class="doc-menu__children">
              <li
                v-for="child of item.children"
                :key="child.name"
              >
                <router-link
                  :to="child.route"
                  :class="['doc-menu__child', { 'doc-menu__child_current': child.route === route.path }]"
                  @click.stop
                >
                  {{ child.name }}
                </router-link>
              </li>
            </ul>
          </OCollapse>
        </li>
      </template>
      <li v-else>
        <router-link
          :class="['doc-menu__item', { 'doc-menu__item_current': item.route === route.path }]"
          :to="item.route"
        >
          <div class="doc-menu__icon">
            <app-svg href="" />
          </div>
          <span class="doc-menu__item-text">
            {{ item.name }}
          </span>
        </router-link>
      </li>
    </template>
  </menu>
</template>

<style lang="scss">
.doc-menu {
  list-style: none;
  display: flex;
  flex-flow: column;

  &__item {
    display: grid;
    grid-template:
      "icon text arrow" 40px / 24px 1fr 16px;
    column-gap: 8px;
    align-items: center;
    text-decoration: none;
    color: var(--o-ground--text-default);

    &:hover &-text {
      color: var(--o-ground--text-contrast);
    }

    &_parent {
      cursor: pointer;
    }

    &_current {
      cursor: default;
    }

    &_current &-text {
      color: var(--o-button--background-default);
    }
  }

  &__item-text {
    transition: color var(--transition-duration) ease-in-out;
    flex-grow: 1;
  }

  &__item_parent &__item-text {
    grid-area: text;
  }

  &__children {
    list-style: none;
  }

  &__child {
    display: flex;
    padding-left: 32px;
    text-decoration: unset;
    line-height: 32px;
    transition: color var(--transition-duration) ease-in-out;
    color: var(--o-ground--text);

    &_current {
      color: var(--o-button--background-default);
      cursor: default;
    }

    &:hover:not(&_current) {
      color: var(--o-ground--text-contrast);
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    border: 1px solid var(--o-ground--text-default);
    border-radius: 8px;
    padding: 3px;
  }

  &__collapse {
    grid-area: children;
  }
}
</style>

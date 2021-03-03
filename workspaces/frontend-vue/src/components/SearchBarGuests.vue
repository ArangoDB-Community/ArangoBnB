<template>
<div>
  <md-button md-menu-trigger v-on:click="showMenu">
    <md-field>
      <label>Who's coming?</label>
      <md-input v-model="type" disabled></md-input>
    </md-field>
</md-button>

    <md-menu :md-offset-x="-300" :md-offset-y="0" :md-active.sync=menu>
      <md-menu-content class="guestMenu">
        <md-menu-item>
        Adults
        <md-button class="md-icon-button md-raised"><md-icon>exposure_neg_1</md-icon></md-button>
        <md-button class="md-icon-button md-raised"><md-icon>exposure_plus_1</md-icon></md-button>
        </md-menu-item>

        <md-menu-item>
        Children
        <md-button class="md-icon-button md-raised"><md-icon>exposure_neg_1</md-icon></md-button>
        <md-button class="md-icon-button md-raised"><md-icon>exposure_plus_1</md-icon></md-button>
        </md-menu-item>

        <md-menu-item>
        Infants
        <md-button class="md-icon-button md-raised"><md-icon>exposure_neg_1</md-icon></md-button>
        <md-button class="md-icon-button md-raised"><md-icon>exposure_plus_1</md-icon></md-button>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
</div>
</template>

<script>
export default {
    name: "SearchBarGuests",
    data: () => ({
        menu: false
      }),
    methods: {
        showMenu: function() {
            this.menu = !this.menu;
        }
    }
}
</script>

<style scoped>
.guestMenu {
    background-color: whitesmoke;
}

</style>
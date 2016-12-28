function HeaderController() {
  this.isMenuExpanded = false;

  this.toggleMenu = () => {
    this.isMenuExpanded = !this.isMenuExpanded;
  }
}

export default HeaderController;

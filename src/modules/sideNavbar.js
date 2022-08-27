export default function generateSideNavbar() {

    const sideNavbar = document.createElement('nav');
    sideNavbar.classList.add('sidenavbar');
    sideNavbar.id = 'sidenavbar';
    // sideNavbar.append(generateOtherTaskLists(), generateProjectListDiv(), createNewProjectButtonDiv()); // not yet ready

    return sideNavbar;
}
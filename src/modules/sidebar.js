export default function generateSidebar() {

    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    sidebar.id = 'sidebar';
    // sidebar.append(generateOtherTaskLists(), generateProjectListDiv(), createNewProjectButtonDiv()); // not yet ready

    return sidebar;
}
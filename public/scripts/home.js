const linkElem = document.getElementById('link');
const linkArr = [
    {
        icon: '<i class="fa-solid fa-pen fa-beat"></i>',
        name: 'Module Inputs',
        route: 'moduleinputs.html'
    },
    {
        icon: 'fa-paperclip',
        name:  'Execution',
        route: 'execution.html'
    },
    {
        icon: 'fa-list',
        name:  'Report',
        route: 'reports.html'
    }
];

// Link to display in home.html
const linksTodisplay = linkArr.map((link, index) => {
    return `
        <li class="link" key=${index}>
            <i class='fa-solid ${link.icon}'></i>
            <a href=${link.route}>
                ${link.name}
            </a>
        </li>
    `
}).join(' ');

if(linkElem) {
    linkElem.innerHTML = linksTodisplay;
} 

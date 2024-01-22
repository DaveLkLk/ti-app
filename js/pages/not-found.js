function pageNotFound(){
    const div = document.createElement('div');
    div.classList.add('not--found')
    div.innerHTML = `
        <h1>| Error 404 |</h1>
        <h2>__The section you are looking for was not found__</h2>
        <small>• This server does not support browsing. Please contact<a href="#"> support </a>for assistance.</small>
        <div class="support">
            <div class="support-animate"></div>
        </div>
    `;
    return div;
}
export function sectionNotFound(){
    const section = document.createElement('section')
    section.classList.add('main_content')
    section.classList.add('main_not-found')
    section.appendChild(pageNotFound())
    return section;
}
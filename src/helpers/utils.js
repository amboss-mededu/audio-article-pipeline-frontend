export function isValidArticle(selectedArticle) {
    return selectedArticle &&
        selectedArticle.hasOwnProperty('title') &&
        selectedArticle.hasOwnProperty('xid') &&
        selectedArticle.title.trim() !== '' &&
        selectedArticle.xid.trim() !== '';
}

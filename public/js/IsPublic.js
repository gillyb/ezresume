export default function isPublic() {

    // TODO: public should only work with slug in the end
    return window.location.search.indexOf('public') !== -1;

}
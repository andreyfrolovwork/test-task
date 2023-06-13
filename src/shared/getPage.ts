export default function getPage(page:number, limitForPage:number):number {
    const offset = page * limitForPage - limitForPage;
    return offset; 
}
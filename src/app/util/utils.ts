export class Utils {
    public static clone(fromObject:any){
        return fromObject && Array.isArray(fromObject)? [...fromObject] : {...fromObject}
    }
}
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToSpaces'
})
export class ConvrtToSpacesPipe implements PipeTransform{
    transform(value: string, character: string): string {
        return value.replace(character,' ');
    }
}
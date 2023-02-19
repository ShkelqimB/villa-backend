export type SortDirection = 'ascending' | 'descending'
export type Comparer<T> = (first: T, second: T) => number;

export type SortMap<T> = {[key in keyof T]: Comparer<T>}

export interface SortProperty {
    name: string;
    direction: SortDirection
}

export const stringFieldSort = <T>(fieldName: keyof T): Comparer<T> =>
    (first: T, second: T) => (first[fieldName] as unknown as string).localeCompare(second[fieldName] as unknown as string);

export const numberFieldSort = <T>(fieldName: keyof T): Comparer<T> =>
    (first: T, second: T) => (first[fieldName] as unknown as number) - (second[fieldName] as unknown as number);

export const boolFieldSort = <T>(fieldName: keyof T): Comparer<T> => (first: T, second: T) => {
    const f = (first[fieldName] as unknown as boolean);
    const s = (second[fieldName] as unknown as boolean);
    if (f && !s) return 1;
    if (!f && s) return -1;
    return 0;
}

export const dateFieldSort = <T>(fieldName: keyof T): Comparer<T> => (first: T, second: T) => {
    const fdate = (first[fieldName] as unknown as Date);
    const sdate = (second[fieldName] as unknown as Date);

    if (!fdate) {
        return 1;
    }

    if (!sdate) {
        return -1;
    }
    
    return fdate.getTime() - sdate.getTime();
}

export const nullSort = <T>(_first: T, _second:T) => 0;

export const invert = <T>(original: Comparer<T>):Comparer<T> => (first: T, second: T) => original(second, first);

export const parseSortString = (sortString: string): SortProperty[] => {
    const fragments = sortString.split(",").filter(item => item);
    return fragments.map(fragment => {
        let direction : SortDirection = 'ascending'
        if (fragment[0]==="-") {
            fragment = fragment.slice(1);
            direction = 'descending';
        }
        return {
            name: fragment,
            direction
        };
    })
};

export const getSorter = <T>(sort: string, sortMap: SortMap<T> ) => {
    const sortFunctions = parseSortString(sort)
        .filter(sp => sortMap[sp.name as keyof T])
        .map(sp => {
            const result = sortMap[sp.name as keyof T]
            return (sp.direction === "ascending") ? result : invert(result);
        });

    return (first: T, second: T) => {
        for (const sorter of sortFunctions) {
            const value = sorter(first, second);
            if (value) {
                return value;
            }
        }
        return 0;
    }
};
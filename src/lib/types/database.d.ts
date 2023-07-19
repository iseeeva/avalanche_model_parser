export type TDatabase = {
    [Filename: string]: {
        [Parent: string]: {
            [Model: string]: {
                [ID: string]: {
                    [Element: string]: number[][]
                }
            }
        }
    }
}
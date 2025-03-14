import Papa from "papaparse"

import {GenericObject} from "../Types"

export const convertToCsv = (rows: GenericObject[], header: string[]) => {
    return Papa.unparse({fields: header.filter((item) => !!item), data: rows})
}

export const escapeNewlines = (value: string) => value.replace(/\n/g, "\\n")

export const downloadCsv = (csvContent: string, filename: string): void => {
    if (typeof window === "undefined") return

    const blob = new Blob([csvContent], {type: "text/csv"})
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export const isValidCSVFile = (file: File) => {
    return new Promise((res) => {
        Papa.parse(file, {
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data && results.data.length > 0) {
                    res(true)
                } else {
                    res(false)
                }
            },
            error: () => {
                res(false)
            },
        })
    })
}

export const isValidJSONFile = (file: File) => {
    return new Promise((res) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                JSON.parse(e.target?.result as string)
                res(true)
            } catch (e) {
                res(false)
            }
        }
        reader.readAsText(file)
    })
}

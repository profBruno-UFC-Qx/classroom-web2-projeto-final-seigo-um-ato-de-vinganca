import fs from "fs"
import path from "path"
import { UPLOAD_DIR } from "../app"
import type { File } from "multer"

export function saveImage(file: File, mangaPictures ?: boolean): string {
  const ext = file.mimetype.split("/")[1]
  const fileName = `act_${Date.now()}.${ext}`
  const fullPath = path.join(UPLOAD_DIR, fileName)

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  }

  fs.writeFileSync(fullPath, file.buffer)

  return `/uploads/${fileName}`
}



export function deleteByPath(filePath: string | undefined): boolean {
  if(filePath === undefined) return false
  const fullPath = path.join(UPLOAD_DIR, path.basename(filePath))

  if(fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath)
    return true
  }
  return false
}

let pic_counter = 0;

export function saveMagaPictures(capCover_id : number , files : File[]): string[] {
  const final : string[] = []
  
  files.forEach((file, index) => {
    const ext = file.mimetype.split("/")[1]
    const fileName = `picture_${index}.${ext}`
    
    const FOLDER_DIR = path.resolve(UPLOAD_DIR, `capCover_${capCover_id}/chapter_${pic_counter}`)
    const fullPath = path.join(FOLDER_DIR, fileName)

    if(!fs.existsSync(FOLDER_DIR)){
      fs.mkdirSync(FOLDER_DIR, { recursive: true })
    }

    fs.writeFileSync(fullPath, file.buffer)

    final.push(`/uploads/capCover_${capCover_id}/chapter_${pic_counter}/${fileName}`)
  })
  pic_counter += 1
  return final
}


export function deleteMangaPictures(capCover_id : number){
  const FOLDER_DIR = path.resolve(UPLOAD_DIR, `capCover_${capCover_id}`)
  
  if(!FOLDER_DIR.startsWith(UPLOAD_DIR)) return 

  if(fs.existsSync(FOLDER_DIR)){
    fs.rmSync(FOLDER_DIR, { recursive: true })
  }
}
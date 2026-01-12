type actCover = {
    url : string
}
type act_cover = {
    url : string
    idCover : string
}
export type actionCardProps = {
    actCover_id ?: number
    actCoverPicture : string | undefined
    actDetails : string
    isReady : boolean
    actNumber : number
    handleDelete ?: (id : number) => void
}

export type capCardProps = {
    capCover_id : number
    capCoverTitle: string
    capCoverNumber : number
    description : string
    capCoverPicture : string
}

export type User = {
    user_id: string
    username : string
    email : string
    role : string
    confirmed : boolean
    blocked : boolean
}

export type capCoverProps = {
    capCover : string
    idCapCover : string
    handleDelete? : (id : string) => void
}

export type CommentFormatResponse = {
    user : User
    text : string
    id : number
    cap_cover : {
        id : number
        idCapCover : string
    }
}

export type FavoritesFormatResponse = {
    isFavorit : boolean
    user : {
        id : number
    }
    cap_cover : {
        idCapCover : string
    }
}

export type Nota = {
    notaAtual : number
    cap_cover : capCoverProps
    user : User
}
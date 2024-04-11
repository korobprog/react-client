import type React from "react"
import { useState } from "react"

import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from "@nextui-org/react"
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../app/services/likesApi"
import {
  useDeletePostsMutation,
  useLazyGetALLPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postsApi"
import { useDeleteCommentMutation } from "../../app/services/commentsApi"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { User } from "../user"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { RiDeleteBinLine } from "react-icons/ri"
import { Typography } from "../typography"
import { selectCurrent } from "../../features/user/userSlice"
import { MetaInfo } from "../meta-info"
import { FcDislike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
import { hasErrorFiled } from "../../utils/has-error-filds"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  id = "",
  likesCount = 0,
  commentsCount = 0,
  cardFor = "post",
  likedByUser = false,
  createdAt,
  commentId = "",
}) => {
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerGetAllPosts] = useLazyGetALLPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostsMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const refetchPost = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap()
        break
      case "current-post":
        await triggerGetAllPosts().unwrap()
        break
      case "comment":
        await triggerGetPostById(id).unwrap()
        break
      default:
        throw new Error("Неверный аргумент cardFor")
    }
  }

  const hendleClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()

      await refetchPost()
    } catch (error) {
      if (hasErrorFiled(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  const hendleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPost()
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          break
        case "comment":
          await deleteComment(id).unwrap()
          break
        default:
          throw new Error("Неверный аргумент cardFor")
      }
    } catch (error) {
      if (hasErrorFiled(error)) {
        setError(error.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/user/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600 "
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={hendleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={hendleClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
            <ErrorMessage error={error} />
          </div>
        </CardFooter>
      )}
    </NextUiCard>
  )
}

import React from 'react'
import LayoutPosts from '../../../../../components/Profile/LayoutPosts'

const UserPostsScene = ({ userProfile }) => (
  <LayoutPosts data={userProfile} profile="users" />
)

export default UserPostsScene

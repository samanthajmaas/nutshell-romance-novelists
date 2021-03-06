//author: Rebecca Parker
//purpose: to render html for users and handle click events that either add user as a friend or delete a current friend


import { deleteUserFriends, useUserFriends, saveUserFriends } from "../users/usersDataProvider.js"


const eventHub = document.querySelector(".container")



export const friendHTML = (user) => {
    if (user.friend){
        return `
        <div class=friendsListCard>
            <p class="friendUserName">${user.username} (friends)</p>
            <button id="deleteFriend" value="${user.id}">Delete Friend</button>
        </div>
        `
    }
    if (!user.friend){
        return `
        <div class=friendsListCard>
            <p class="friendUserName">${user.username}</p>
            <button id="addFriend" value="${user.id}">Add Friend</button>
        </div>
        `
    }
}

eventHub.addEventListener("click", event => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    
    if (event.target.id === "deleteFriend"){
        const friendId = parseInt(event.target.value)
        const userFriends = useUserFriends()
        
        const relationshipObj = userFriends.find(r => {
            if(currentUserId === r.userId || currentUserId === r.friendId){
            }if(friendId === r.userId || friendId === r.friendId){
                return r
            }
        })

      
        deleteUserFriends(relationshipObj.id)
        localStorage.setItem("event", "friendUserChanged")
        
        
    }
    if (event.target.id === "addFriend"){

        const newObj = {
            userId: currentUserId,
            friendId: parseInt(event.target.value)
        }
        saveUserFriends(newObj)
        localStorage.setItem("event", "friendUserChanged")

    }
})
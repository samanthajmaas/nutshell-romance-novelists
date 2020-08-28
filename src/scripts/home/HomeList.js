import { getNews, useNews, deleteNews} from "./HomeProvider.js"
import {getWeatherData } from "../weather/WeatherProvider.js"
import { NewsHTMLConverter } from "./HomeHTMLGenerator.js"
import { getUserFriends, useUserFriends, getUsers, useUsers} from "../users/usersDataProvider.js"

const contentTarget = document.querySelector(".newsContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("newsStateChanged", customEvent => {
    NewsList()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNews--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
       deleteNews(id)
    }
})

export const NewsList = () => {
    let currentUserId = parseInt(sessionStorage.getItem("activeUser"))
    getWeatherData()
    .then(() => {
    getNews()
    .then(() => {
    getUserFriends()
        .then(() => {
        const allNews = useNews()
        const allFriends = useUserFriends()
        const userFriends = allFriends.filter(f => {
            if(currentUserId === f.friendId || currentUserId === f.userId) {
                return f
            }
        })
        let currentRelationships = userFriends.filter(friend => {
            if (currentUserId === friend.userId || currentUserId === friend.friendId) {
                return friend
            }
        })

        const foundNews = currentRelationships.map(relationship => {
            return allNews.find(news => {
                if (news.userId === relationship.friendId || news.userId === relationship.userId){
                    if (news.userId != currentUserId){
                    return news
                    }
                }
            })
        })
        const friendNews = foundNews.filter(stories => {
            if (stories != undefined){
                return stories
            }
        })

        const userNews = allNews.filter(stories => {
            if (stories.userId === currentUserId) {
                return stories
            }
        })
        render(friendNews, userNews)
        })

    })
    })
    }     

    const render = (friendNews, userNews) => {
        let itemHTML = ""
    userNews.map(item => {
        itemHTML += NewsHTMLConverter("yours", item)
    })
    friendNews.map(item => {
        itemHTML += NewsHTMLConverter("theirs", item)
    })
        contentTarget.innerHTML = itemHTML
    }

    // 
    // 


    // const filteredNews = userFriends.map(f => {
    //     console.log(f.userId)
    //     return allNews.find(story => {
    //         if(story.userId === f.userId) {
    //             return story
    //         }
    //     })
    // })
    // console.log(filteredNews)
    // render(filteredNews)
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import Axios from 'axios'
//import axios from './axios-auth'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null,
            comment: [],
            comments: [],
            carousel: [],
            carousels: [],
            games: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            setComments(state, comments) {
                state.comments = comments
            },
            setCarousel(state, carousels) {
                state.carousels = carousels
            },
            storeAllGames(state, games) {
                state.games = games
            },
            addPost(state, post) {
                state.loadedPosts.push(post)
            },
            addComment(state, comment) {
                state.comment = comment
            },
            addCarousel(state, carousel) {
                state.carousel = carousel
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(
                    post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            },
            editComment(state, editedComment) {
                const commentIndex = state.comments.findIndex(
                    comment => comment.id === editedComment.id)
                state.comments[commentIndex] = editedComment
            },
            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios
                    .$get('/posts.json')
                    .then(data => {
                        const postsArray = []
                        for (const key in data) {
                            postsArray.push({ ...data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch(e => context.error(e))
            },
            addPost(vuexContext, post) {
                const createdPost = {
                    ...post, 
                        updatedDate: new Date()
                }
                return this.$axios
                    .$post('/posts.json?auth=' + vuexContext.state.token, createdPost)
                    .then(data => {
                        vuexContext.commit('addPost', { ...createdPost, id: data.name})
                    })
                    .catch(e => console.log(e))
            },
            editPost(vuexContext, editedPost) {
                return this.$axios.$put(
                    '/posts/' + 
                    editedPost.id + 
                    '.json?auth=' + vuexContext.state.token, editedPost)
                    .then(res => {
                        vuexContext.commit('editPost', editedPost)
                    })
                    .catch(e => console.log(e))
            },
            setPosts(vuexContext, comment) {
                vuexContext.commit('setPosts', posts)
            },
            // CLIENT ADD COMMENT
            addComment(vuexContext, comment) {
                const createdComment = {
                    ...comment
                }
                return this.$axios
                    .$post('/comments.json' , createdComment)
                    .then(data => {
                        vuexContext.commit('addComment', { ...createdComment})
                    })
                    .catch(e => console.log(e))
            },
            // ADMIN EDIT - ALLOW COMMENT
            editComment(vuexContext, editedComment) {
                return this.$axios.$put(
                    '/comments/' + 
                    editedComment.id + 
                    '.json?auth=' + vuexContext.state.token, editedComment)
                    .then(res => {
                        vuexContext.commit('editComment', editedComment)
                    })
                    .catch(e => console.log(e))
            },
            fetchComments (vuexContext, context) {
                this.$axios
                    .$get('/comments.json')
                    .then(data => {
                        const commentsArray = []
                        for (const key in data) {
                            commentsArray.push({ ...data[key], id: key })
                        }
                        vuexContext.commit('setComments', commentsArray)
                    })
                    .catch(e => context.error(e))
            }, 
            fetchGames ({ commit }) {
                Axios.get('https://vue-project-games.firebaseio.com/games.json')
                  .then(res => res.data)
                  .then(games => { commit('storeAllGames', games) })
                  .catch(error => console.log(error))
              },//
            // ADD CAROUSEL
            addCarousel(vuexContext, carousel) {
                const createdCarousel = {
                    ...carousel
                }
                return this.$axios
                    .$post('/carousel.json' , createdCarousel)
                    .then(data => {
                        vuexContext.commit('addCarousel', { ...createdCarousel})
                    })
                    .catch(e => console.log(e))
            },
            fetchCarousel (vuexContext, context) {
                this.$axios
                    .$get('/carousel.json')
                    .then(data => {
                        const carouselArray = []
                        for (const key in data) {
                            carouselArray.push({ ...data[key], id: key })
                        }
                        vuexContext.commit('setCarousel', carouselArray)
                    })
                    .catch(e => context.error(e))
              },
            authenticateUser(vuexContext, authData) {
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
                if(!authData.isLogin) {
                    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
                }
                return this.$axios.$post(authUrl, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                    }
                )
                .then(result => {
                    vuexContext.commit('setToken', result.idToken)
                    localStorage.setItem('token', result.idToken)
                    localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
                    Cookie.set('jwt', result.idToken)
                    Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
                    return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authentificated!'})
                    //vuexContext.dispatch('setLogoutTimer', result.expiresIn * 1000)
                })
                .catch(error => console.log(error))
            },
            /*setLogoutTimer(vuexContext, duration) {
                setTimeout(() => {
                    vuexContext.commit('clearToken')
                }, duration)
            },*/
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
                    if(!jwtCookie) {
                        return;
                    }
                    token = jwtCookie.split('=')[1]
                    expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1]
                } else if(process.client) {
                    token = localStorage.getItem('token')
                    expirationDate = localStorage.getItem('tokenExpiration')
                }
                if(new Date().getTime() > +expirationDate || !token) {
                    console.log('No token or invalid token')
                    vuexContext.dispatch('logout')
                    return;
                }
                //vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
                vuexContext.commit('setToken', token)
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken')
                Cookie.remove('jwt')
                Cookie.remove('expirationDate')
                if(process.client) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            loadedComments(state) {
                return state.comments
            },
            loadedCarousel(state) {
                return state.carousels
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore
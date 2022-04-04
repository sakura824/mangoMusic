import request from './request.js'
import qs from 'qs'

//搜索
export const SearchApi = (params) => request.musicInstance.get('/search',{params})
//热搜榜
export const HotApi = () => request.musicInstance.get('/search/hot/detail')
//首页
	//首页-轮播图
	export const BannerApi = () => request.musicInstance.get('/banner')	//可选参数type   0: pc   1: android   2: iphone   3: ipad
	//首页-推荐歌单
	export const RecommendedApi = (params) => request.musicInstance.get('/personalized',{params})
	//首页-最新音乐
	export const NewSongApi = () => request.musicInstance.get('/personalized/newsong')
	//首页-推荐MV
	export const MVApi = () => request.musicInstance.get('/personalized/mv')
//推荐歌单
	//精品数据
	export const TopDataApi = (params) => request.musicInstance.get('/top/playlist/highquality',{params})
	//内容数据
	export const ContentDataApi = (params) => request.musicInstance.get('/top/playlist/',{params})
//最新音乐
	export const NewMusicApi = (params) => request.musicInstance.get('/top/song',{params})
//MV
	export const NewMVApi = (params) => request.musicInstance.get('/mv/all',{params})
	

//歌单详情页
export const PlayListDetailApi = (params) => request.musicInstance.get('/playlist/detail',{params})
//热门评论
export const HotCommentApi = (params) => request.musicInstance.get('/comment/hot',{params})
//最新评论
export const PlayListCommentApi = (params) => request.musicInstance.get('/comment/playlist',{params})
//播放音乐
export const PlaySongApi = (params) => request.musicInstance.get('/song/url',{params})
//音乐详情
export const SongDetail = (params) => request.musicInstance.get('/song/detail',{params})
//音乐歌词
export const SongLyrics = (params) => request.musicInstance.get('/lyric',{params})

//mv播放地址
export const MVUrlApi = (params) => request.musicInstance.get('/mv/url',{params})
//相关mv
export const SimiMVApi = (params) => request.musicInstance.get('/simi/mv',{params})
//mv信息
export const MVDetailApi = (params) => request.musicInstance.get('/mv/detail',{params})
//歌手信息
export const SingerApi = (params) => request.musicInstance.get('/artists',{params})
//mv评论
export const MVCommentApi = (params) => request.musicInstance.get('/comment/mv',{params})


//登录
export const LoginApi = (data) => request.myInstance.post('/api/login',qs.stringify(data))
//注册
export const RegisterApi = (data) => request.myInstance.post('/api/register',qs.stringify(data))
//查看我的评论
export const MyCommentApi = (data) => request.myInstance.post('/api/commentAll',qs.stringify(data))
//发送评论
export const SendCommentApi = (data) => request.myInstance.post('/api/comment',qs.stringify(data))
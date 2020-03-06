function request(url,data={},method='GET',connectType='json'){

	const baseUrl = 'https://douban.uieee.com'
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			data,
			method,
			header:{
				'Content-Type': 'json'
			},
			success(res){
				resolve(res)
			},
			fail(err){
				reject(err)
			}
		})
	})
}

export default request
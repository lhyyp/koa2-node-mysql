<template>
	<div class="home">
		<ul class='UserInfo'>
			<li class='UserInfoItem'>
				<span class="icon iconUser"></span>
				<div>
					<span class="title">New Visits</span>
					<span class="message">102,400</span>
				</div>
			</li>
			<li class='UserInfoItem'>
				<span class="icon iconMessages"></span>
				<div>
					<span class="title">Messages</span>
					<span class="message">102,400</span>
				</div>
			</li>
			<li class='UserInfoItem'>
				<span class="icon iconArticle"></span>
				<div>
					<span class="title">Article</span>
					<span class="message">102,400</span>
				</div>
			</li>
			<li class='UserInfoItem'>
				<span class="icon iconBug"></span>
				<div>
					<span class="title">Bug</span>
					<span class="message">102,400</span>
				</div>
			</li>
		</ul>
		<ve-line :data="chartData" :settings="chartSettings" class="chartsCom"></ve-line>
	</div>
</template>	
<script>
export default {
    data () {
      this.chartSettings = {
        metrics: ['访问用户', '注册用户'],
        dimension: ['日期']
      }
      return {
        chartData: {
          columns: ['日期', '访问用户', '注册用户'],
          rows: [
            { '日期': '2018年1月1日', '访问用户': 1393, '注册用户': 1093},
            { '日期': '2018年3月1日', '访问用户': 3530, '注册用户': 3230},
            { '日期': '2018年6月1日', '访问用户': 2923, '注册用户': 2623},
            { '日期': '2018年9月1日', '访问用户': 1723, '注册用户': 1423},
            { '日期': '2018年12月1日', '访问用户': 3792, '注册用户': 3492},
            { '日期': '2019年1月1日', '访问用户': 4593, '注册用户': 4293}
          ]
        }
      }
    }
  }
</script>

<style>
.home{background: #f0f2f5;padding: 20px;}
.UserInfo{display: flex;}
.UserInfo .UserInfoItem{width: 240px;height: 110px;background: #fff;display: flex;align-items: center;justify-content:space-between;}
.UserInfo .UserInfoItem+.UserInfoItem{margin-left: 20px;}
.UserInfo .UserInfoItem:hover{ box-shadow:black 0px 0px 10px;}
.UserInfo .UserInfoItem .icon{width: 60px;height: 60px;background-size:48px;display: block;margin-left: 15px;border-radius: 5px;}
.UserInfo .UserInfoItem .iconUser{background: url('~static/icon/user1.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconUser:hover{background:#1296db url('~static/icon/user.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconMessages{background: url('~static/icon/Messages1.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconMessages:hover{background:#d4237a url('~static/icon/Messages.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconArticle{background: url('~static/icon/article1.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconArticle:hover{background:#1afa29 url('~static/icon/article.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconBug{background: url('~static/icon/Bug1.png') no-repeat center center;}
.UserInfo .UserInfoItem .iconBug:hover{background:#d4233c url('~static/icon/Bug.png') no-repeat center center;}
.UserInfo .UserInfoItem div{display: flex;flex-direction: column ;margin-right: 20px; }
.UserInfo .UserInfoItem div .title{line-height: 18px; color: rgba(0,0,0,.45); font-size: 16px; margin-bottom: 12px;font-weight: 700; } 
.UserInfo .UserInfoItem div .message{font-weight: 700;}
.chartsCom{background: #fff;padding: 20px;box-sizing: content-box;margin:30px 0;}
</style>
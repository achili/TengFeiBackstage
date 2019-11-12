<template>
	<div>

		<NbPagerSelection :pager="pager" :activeItem="activeUser" :initFilter="initFilter">

			<span slot="title">
				<span v-if="activeUser.name && activeUser.uuid">
					<img :src="activeUser.getAvatarUrl()" class="img-sm"/>
					<span class="ml10">{{activeUser.name}}</span>
				</span>
				<span v-else>
					请选择一位用户...
				</span>
			</span>

			<div class="mb10 p10 cursor br4 border" v-for="user in pager.data" :key="user.uuid"
			     @click.stop.prevent="clickItem(user)"
			     :class="{'bg-white':user.uuid !== activeUser.uuid,'bg-azure':user.uuid === activeUser.uuid}"
			     slot="cells">
				<div>
					<div class="media">
						<div class="pull-left">
							<img class="img-rounded img-md" :src="user.getAvatarUrl()">
						</div>
						<div class="media-body">
							<div>
								<span class="f16 black hover-underline cursor">
									{{user.name}}
									<span v-if="user.uuid===currentUser.uuid"
									      class="text-danger">(It's you)</span>
								</span>
							</div>
							<div>
								<div class="mt5">
									{{user.role.name}}
								</div>
							</div>
							<div class="mv5 text-muted">
								{{user.description}}
							</div>

						</div>
					</div>
				</div>
			</div>

		</NbPagerSelection>


	</div>

</template>
<script>
	import Pager from "../../../common/model/_base/Pager";
	import User from "../../../common/model/user/User";
	import NbPagerSelection from "../../../components/NbPagerSelection";

	export default{
		data(){
			return {
				currentUser: this.$store.state.user,
				pager: new Pager(User, 5)
			}
		},
		props: {
			activeUser: {
				type: User,
				required: true
			},
			initFilter: {
				type: Object,
				required: false
			}
		},
		watch: {},
		methods: {
			clickItem(user){
				this.activeUser.render(user);
			}
		},
		components: {
			NbPagerSelection
		},
		mounted(){


		}
	}
</script>

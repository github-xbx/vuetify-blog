<template>
  <v-container>
    <v-card elevation="5">
      <v-card-title >全部分类</v-card-title>
      <v-card-subtitle>
        <v-item-group >

            <v-row>
              <v-col
                v-for="n in 5"
                :key="n"
                cols="12"
                md="4"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-card
                    class="d-flex align-center"
                    dark
                    @click="toggle"
                  >


                      <div
                        v-if="active"
                        class="text-h2 flex-grow-1 text-center black--text"
                      >
                        Active
                      </div>

                      <v-img v-if="!active" src="https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg"/>


                  </v-card>
                </v-item>
              </v-col>
            </v-row>

        </v-item-group>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Category"
}
</script>

<style scoped>

</style>

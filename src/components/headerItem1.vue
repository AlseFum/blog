<script setup>

</script>
<template>
    <div class="headerItem">
<slot></slot>
</div>
</template>
<style scoped>
.headerItem {
  color: rgb(15, 134, 54);
  font-size: 20px;
  padding:4px 0;
  position:relative;
  font-weight: 300;
  font-family: 'Poppins', sans-serif;
}



.headerItem::after{
  position:absolute;
  content: '';
  width: 100%;
  bottom:0;
  height: 0px;
  background: #4eb663;
  display: block;
  transition: 0.5s;
}
/* .headerItem:hover{
  background-color: #ebebeb;
} */
.headerItem:hover::after {
  height:4px;
}

</style>
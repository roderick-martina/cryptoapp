<template>
    <div class="w-full flex flex-row py-6 shadow hover:shadow-md rounded bg-white mt-3 font-medium cursor-pointer ">
        <slot name="index"></slot>
        <div class="w-64  flex flex-row">
            <slot name="image"></slot>
            <slot name="currency"></slot>
        </div>
        <slot name="marketCap"></slot>
        <slot name="price"></slot>
        <slot name="volume"></slot>
        <slot name="supply"></slot>
        <slot name="change"></slot>
        <!-- <slot name="graph"></slot> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    }
}
</script>

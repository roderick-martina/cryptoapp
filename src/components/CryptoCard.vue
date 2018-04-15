<template>
    <div class="w-full flex flex-row md:py-6 py-4 shadow hover:shadow-md rounded bg-white mt-3 font-medium cursor-pointer ">
        <slot name="index"></slot>
        <div class="md:w-64 md:flex-none flex-1  flex flex-col justify-center">
            <div class="flex flex-row">
                <slot name="image"></slot>
                <slot name="currency"></slot>
            </div>
        </div>
        <div class="flex flex-col justify-center md:flex-1 ">
            <div class="flex flex-row">
                <slot name="price" class=""></slot>
            </div>
        </div>
        <slot name="marketCap"></slot>
        <slot name="volume"></slot>
        <slot name="supply"></slot>
        <div class="flex flex-col justify-center md:flex-1 ">
            <div class="flex flex-row">
                <slot name="change"></slot>
            </div>
        </div>
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

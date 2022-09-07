<template>
  <div class="loader" :class="{ 'loader--full': fullScreen }">
    <div class="loader-container">
      <svg class="loader-circle">
        <circle cx="50%" cy="50%" r="40%"></circle>
      </svg>
    </div>
  </div>
</template>

<script setup>
const { fullScreen } = defineProps({
  fullScreen: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped lang="scss">
$root: loader;

.#{$root} {
  &--full {
    z-index: 999;
    position: fixed;
    inset: 0;
    background: rgba(255, 242, 242, 0.3);

    .#{$root}-container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      aspect-ratio: 1 / 1;
    }
  }

  &-container {
    position: relative;
    width: clamp(50px, 7vw, 72px);
    aspect-ratio: 1 / 1;
  }

  &-circle {
    width: 100%;
    height: 100%;
    circle {
      transform: rotateZ(0);
      transform-origin: center;
      fill: none;
      stroke: #fafafa;
      stroke-width: 12%;
      stroke-dasharray: 105%, 42%;
      animation: spin .8s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>

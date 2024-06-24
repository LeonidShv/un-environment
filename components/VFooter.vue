<template>
  <p class="footer__contacts d-flex gap-2">
    <a
      class="footer__link"
      href="https://github.com/LeonidShv/un-environment"
      target="_blank"
      aria-label="visit a Github open source project, un-environment"
    >
      <svg
        class="footer__icon"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
                                    c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
                                    c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
                                    c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368
                                    c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68
                                    c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672
                                    c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992
                                    c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496
                                    c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"
            ></path>
          </g>
        </g>
      </svg>
    </a>

    <a
      class="footer__link"
      href="https://www.linkedin.com/in/leonid-shvab-a2a32b1a7/"
      target="_blank"
      aria-label="visit a Linkedin of Leonid Shvab"
    >
      <svg
        class="footer__icon"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
        ></path>
      </svg>
    </a>

    <a
      class="footer__link"
      href="https://x.com/LeonidShvab"
      target="_blank"
      aria-label="visit a twitter (x) of Leonid Shvab"
    >
      <svg
        class="footer__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="1200"
        height="1227"
        viewBox="0 0 1200 1227"
        fill="none"
      >
        <g clip-path="url(#clip0_1_2)">
          <path
            d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="1200" height="1227" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </a>
  </p>

  <p class="footer__date">2024</p>
</template>

<style lang="scss">
.footer {
  &__icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--el-color-primary);
  }

  &__link {
    display: flex;
    align-items: center;
  }

  &__date {
    font-weight: bold;
    color: var(--el-color-primary);
  }
}
</style>

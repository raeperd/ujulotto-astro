import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../astro_BvCfnv2U.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Image } from './generic_yKnQzQRn.mjs';
import { $ as $$Layout } from './index_DXRALvnC.mjs';

const iconKakaoTalk = new Proxy({"src":"/_astro/iconKakaoTalk.CWnO1LYm.svg","width":22,"height":20,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/raeperd.117/Codes/github/ujulotto-astro/src/images/iconKakaoTalk.svg";
							}
							
							return target[name];
						}
					});

const iconLoginBalls = new Proxy({"src":"/_astro/iconLoginBalls.DVCeVjJB.svg","width":85,"height":25,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/raeperd.117/Codes/github/ujulotto-astro/src/images/iconLoginBalls.svg";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\uC6B0\uC8FC\uB85C\uB610" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="relative w-full h-full"> ${renderComponent($$result2, "Image", $$Image, { "class": "mx-auto mt-[150px]", "src": iconLoginBalls, "alt": "login balls" })} <h1 class="text-center mt-[27px] text-xl">
당신의 로또 1등번호,<br>우주로또에서 뽑아가세요!
</h1> <div class="absolute bottom-[188px] w-full px-4 flex-col flex items-center"> <button id="login" class="bg-[#fee500] items-center justify-center gap-2.5 flex w-full text-black py-4 rounded-[4px]"> ${renderComponent($$result2, "Image", $$Image, { "class": "", "src": iconKakaoTalk, "alt": "login balls" })} <p class="inline text-lg font-semibold">카카오로 계속하기</p> </button> <a class="underline text-[#ededed] text-sm font-medium mt-5" href="/">비회원으로 둘러보기</a> </div>  </main> ` })}`;
}, "/Users/raeperd.117/Codes/github/ujulotto-astro/src/pages/login.astro", void 0);

const $$file = "/Users/raeperd.117/Codes/github/ujulotto-astro/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, $$url as url };

import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, a as stores$1, b as validate_store, c as component_subscribe, o as onMount, g as goto, f as element, t as text, k as claim_element, l as children, m as claim_text, h as detach_dev, n as attr_dev, p as add_location, r as insert_dev, u as append_dev, x as listen_dev, z as noop, e as space, E as empty, q as query_selector_all, j as claim_space, D as set_style, y as set_data_dev, B as set_store_value } from './client.9af4dc2f.js';

/* src\routes\steps\[step].svelte generated by Svelte v3.31.2 */
const file = "src\\routes\\steps\\[step].svelte";

// (90:0) {#if showNext}
function create_if_block(ctx) {
	let button;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			t = text("التالي");
			this.h();
		},
		l: function claim(nodes) {
			button = claim_element(nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			t = claim_text(button_nodes, "التالي");
			button_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(button, "class", "w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 info-text");
			add_location(button, file, 90, 0, 3074);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, t);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*nextSlide*/ ctx[4], false, false, false);
				mounted = true;
			}
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(90:0) {#if showNext}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let div2;
	let p;
	let t1;
	let t2;
	let div1;
	let div0;
	let t3;
	let if_block_anchor;
	let if_block = /*showNext*/ ctx[2] && create_if_block(ctx);

	const block = {
		c: function create() {
			t0 = space();
			div2 = element("div");
			p = element("p");
			t1 = text(/*info*/ ctx[0]);
			t2 = space();
			div1 = element("div");
			div0 = element("div");
			t3 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-8e02cb\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			p = claim_element(div2_nodes, "P", { class: true, style: true });
			var p_nodes = children(p);
			t1 = claim_text(p_nodes, /*info*/ ctx[0]);
			p_nodes.forEach(detach_dev);
			t2 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { style: true, class: true });
			children(div0).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			document.title = "حاكينا - نقاط";
			attr_dev(p, "class", "text-center info-text mb-2");
			set_style(p, "direction", "rtl");
			add_location(p, file, 84, 4, 2741);
			set_style(div0, "width", /*progress*/ ctx[1] + "%");
			attr_dev(div0, "class", "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500");
			add_location(div0, file, 86, 6, 2896);
			attr_dev(div1, "class", "overflow-hidden h-2 mb-1 text-xs flex rounded bg-pink-200");
			add_location(div1, file, 85, 4, 2817);
			attr_dev(div2, "class", "relative p-0");
			add_location(div2, file, 83, 0, 2709);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div2, anchor);
			append_dev(div2, p);
			append_dev(p, t1);
			append_dev(div2, t2);
			append_dev(div2, div1);
			append_dev(div1, div0);
			insert_dev(target, t3, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*info*/ 1) set_data_dev(t1, /*info*/ ctx[0]);

			if (dirty & /*progress*/ 2) {
				set_style(div0, "width", /*progress*/ ctx[1] + "%");
			}

			if (/*showNext*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div2);
			if (detaching) detach_dev(t3);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload({ params }, session) {
	if (!session.googleToken || !session.token || !params.step) {
		return this.redirect(302, "/");
	}

	if (session.step && Number(session.step) + 1 < Number(params.step)) {
		return this.redirect(302, `steps/${session.step}`);
	}

	return { step: params.step, progressStep: 100 };
}

function instance($$self, $$props, $$invalidate) {
	let $session;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("U5Bstepu5D", slots, []);
	const { session } = stores$1();
	validate_store(session, "session");
	component_subscribe($$self, session, value => $$invalidate(7, $session = value));
	let info = "جار التحقق ...";
	let { step } = $$props, { progressStep } = $$props;
	let progress = 100;

	onMount(() => {
		runInterval();
	});

	let showNext = false;

	const runInterval = () => {
		let interval = setInterval(
			() => {
				let step = 100 / 8 * 0.005;
				$$invalidate(5, progressStep -= step);
				$$invalidate(1, progress = progressStep);

				if (progressStep <= 0) {
					clearInterval(interval);
					finProg();
				}
			},
			5
		);
	};

	const finProg = () => {

		return grecaptcha.execute("6LdEDyYaAAAAAAgRMYwA01ImK8hN5gGi9au6KTgB", { action: `step${step}` }).then(function (token) {
			if (token) {
				window.serverCall("/settoken", { token }).then(res => res.json()).then(() => {
					set_store_value(session, $session.googleToken = token, $session);

					window.serverCall("/steps/nextStep", { step }).then(res => res.json()).then(data => {
						if (data.status == "success") {
							$$invalidate(2, showNext = true);
							set_store_value(session, $session.step = step, $session);
							set_store_value(session, $session.token = data.accessToken, $session);
							$$invalidate(0, info = "إضغط على التالي");
						} else {
							return goto("/");
						}
					});
				});
			} else {
				window.location.href = "/";
			}
		});
	};

	function nextSlide() {
		if (progress > 0) {
			return;
		}

		$$invalidate(2, showNext = false);
		goto(`/steps/${Number($session.step) + 1}`);
		runInterval();
	}

	const writable_props = ["step", "progressStep"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Bstepu5D> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("step" in $$props) $$invalidate(6, step = $$props.step);
		if ("progressStep" in $$props) $$invalidate(5, progressStep = $$props.progressStep);
	};

	$$self.$capture_state = () => ({
		preload,
		stores: stores$1,
		goto,
		onMount,
		session,
		info,
		step,
		progressStep,
		progress,
		showNext,
		runInterval,
		finProg,
		nextSlide,
		$session
	});

	$$self.$inject_state = $$props => {
		if ("info" in $$props) $$invalidate(0, info = $$props.info);
		if ("step" in $$props) $$invalidate(6, step = $$props.step);
		if ("progressStep" in $$props) $$invalidate(5, progressStep = $$props.progressStep);
		if ("progress" in $$props) $$invalidate(1, progress = $$props.progress);
		if ("showNext" in $$props) $$invalidate(2, showNext = $$props.showNext);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*step*/ 64) {
			 switch (Number(step)) {
				case 1:
					$$invalidate(0, info = "جار التحقق من المعلومات");
					break;
				case 2:
					$$invalidate(0, info = "جار تجهيز النقاط ...");
					break;
				case 3:
					$$invalidate(0, info = "جار التحقق من حسابك ...");
					break;
				case 4:
					$$invalidate(0, info = "جار إحتساب البيانات ...");
					break;
				case 5:
					$$invalidate(0, info = "جار العمل على توليد النقاط ...");
					break;
				default:
					goto("/finishup");
			}
		}
	};

	return [info, progress, showNext, session, nextSlide, progressStep, step];
}

class U5Bstepu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { step: 6, progressStep: 5 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bstepu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*step*/ ctx[6] === undefined && !("step" in props)) {
			console.warn("<U5Bstepu5D> was created without expected prop 'step'");
		}

		if (/*progressStep*/ ctx[5] === undefined && !("progressStep" in props)) {
			console.warn("<U5Bstepu5D> was created without expected prop 'progressStep'");
		}
	}

	get step() {
		throw new Error("<U5Bstepu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set step(value) {
		throw new Error("<U5Bstepu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get progressStep() {
		throw new Error("<U5Bstepu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set progressStep(value) {
		throw new Error("<U5Bstepu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bstepu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3N0ZXBdLmY5ZjliMTBlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3N0ZXBzL1tzdGVwXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHN2ZWx0ZTpoZWFkPlxyXG5cdDx0aXRsZT7Yrdin2YPZitmG2KcgLSDZhtmC2KfYtzwvdGl0bGU+XHJcbjwvc3ZlbHRlOmhlYWQ+XHJcbjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxyXG5cdGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHtwYXJhbXN9LCBzZXNzaW9uKSB7XHJcblx0XHRpZighc2Vzc2lvbi5nb29nbGVUb2tlbiB8fCAhc2Vzc2lvbi50b2tlbiB8fCAhcGFyYW1zLnN0ZXApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdCgzMDIsICcvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlc3Npb24uc3RlcCAmJiAoTnVtYmVyKHNlc3Npb24uc3RlcCkrMSk8TnVtYmVyKHBhcmFtcy5zdGVwKSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0KDMwMixgc3RlcHMvJHsoc2Vzc2lvbi5zdGVwKX1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGVwOnBhcmFtcy5zdGVwLFxyXG4gICAgICAgICAgICBwcm9ncmVzc1N0ZXA6MTAwXHJcbiAgICAgICAgfVxyXG5cdH1cclxuPC9zY3JpcHQ+XHJcbjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgeyBzdG9yZXMsIGdvdG8gfSBmcm9tICdAc2FwcGVyL2FwcCc7XHJcblx0aW1wb3J0IHtvbk1vdW50fSBmcm9tICdzdmVsdGUnXHJcblx0Y29uc3QgeyBzZXNzaW9uICB9ID0gc3RvcmVzKCk7XHJcbiAgICBsZXQgaW5mbyA9ICfYrNin2LEg2KfZhNiq2K3ZgtmCIC4uLidcclxuICAgIGV4cG9ydCBsZXQgc3RlcCxwcm9ncmVzc1N0ZXA7IFxyXG4gICAgJDogc3dpdGNoKE51bWJlcihzdGVwKSl7XHJcbiAgICAgICAgY2FzZSAxIDogaW5mbyA9ICfYrNin2LEg2KfZhNiq2K3ZgtmCINmF2YYg2KfZhNmF2LnZhNmI2YXYp9iqJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6IGluZm8gPSAn2KzYp9ixINiq2KzZh9mK2LIg2KfZhNmG2YLYp9i3IC4uLic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzIDogaW5mbyA9ICfYrNin2LEg2KfZhNiq2K3ZgtmCINmF2YYg2K3Ys9in2KjZgyAuLi4nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNCA6IGluZm8gPSAn2KzYp9ixINil2K3Yqtiz2KfYqCDYp9mE2KjZitin2YbYp9iqIC4uLic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1IDogaW5mbyA9ICfYrNin2LEg2KfZhNi52YXZhCDYudmE2Ykg2KrZiNmE2YrYryDYp9mE2YbZgtin2LcgLi4uJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBnb3RvKCcvZmluaXNodXAnKVxyXG4gICAgfVxyXG4gICAgbGV0IHByb2dyZXNzID0gMTAwXHJcbiAgICBvbk1vdW50KCgpPT57XHJcbiAgICAgICAgcnVuSW50ZXJ2YWwoKVxyXG4gICAgfSlcclxuICAgIGxldCBzaG93TmV4dCA9IGZhbHNlXHJcbiAgICBjb25zdCBydW5JbnRlcnZhbCA9ICgpPT57XHJcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgbGV0IHN0ZXAgPSAoMTAwLzgpKjAuMDA1XHJcbiAgICAgICAgICAgIHByb2dyZXNzU3RlcC09c3RlcFxyXG4gICAgICAgICAgICBwcm9ncmVzcyA9ICBwcm9ncmVzc1N0ZXBcclxuICAgICAgICAgICAgaWYocHJvZ3Jlc3NTdGVwPD0gMCl7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgZmluUHJvZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDUpXHJcbiAgICB9XHJcbiAgICBjb25zdCBmaW5Qcm9nID0gKCk9PntcclxuICAgICAgICBpZighcHJvY2Vzcy5icm93c2VyKXJldHVybjtcclxuICAgICAgICByZXR1cm4gZ3JlY2FwdGNoYS5leGVjdXRlKCc2TGRFRHlZYUFBQUFBQWdSTVl3QTAxSW1LOGhONWdHaTlhdTZLVGdCJywge2FjdGlvbjogYHN0ZXAke3N0ZXB9YH0pLnRoZW4oZnVuY3Rpb24odG9rZW4pIHtcclxuICAgICAgICAgICAgaWYodG9rZW4pe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnNlcnZlckNhbGwoJy9zZXR0b2tlbicse3Rva2VufSkudGhlbigocmVzKT0+cmVzLmpzb24oKSkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICRzZXNzaW9uLmdvb2dsZVRva2VuID0gdG9rZW5cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2VydmVyQ2FsbCgnL3N0ZXBzL25leHRTdGVwJyx7c3RlcH0pLnRoZW4ocmVzPT5yZXMuanNvbigpKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dOZXh0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNlc3Npb24uc3RlcCA9IHN0ZXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZXNzaW9uLnRva2VuID0gZGF0YS5hY2Nlc3NUb2tlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9ICfYpdi22LrYtyDYudmE2Ykg2KfZhNiq2KfZhNmKJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnb3RvKCcvJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy8nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG5leHRTbGlkZSgpe1xyXG4gICAgICAgIGlmKHByb2dyZXNzPjApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNob3dOZXh0ID0gZmFsc2VcclxuICAgICAgICBnb3RvKGAvc3RlcHMvJHtOdW1iZXIoJHNlc3Npb24uc3RlcCkrMX1gKVxyXG4gICAgICAgIHJ1bkludGVydmFsKClcclxuICAgIH1cclxuPC9zY3JpcHQ+XHJcbjxkaXYgY2xhc3M9XCJyZWxhdGl2ZSBwLTBcIj5cclxuICAgIDxwIGNsYXNzPVwidGV4dC1jZW50ZXIgaW5mby10ZXh0IG1iLTJcIiBzdHlsZT1cImRpcmVjdGlvbjpydGxcIj57aW5mb308L3A+XHJcbiAgICA8ZGl2IGNsYXNzPVwib3ZlcmZsb3ctaGlkZGVuIGgtMiBtYi0xIHRleHQteHMgZmxleCByb3VuZGVkIGJnLXBpbmstMjAwXCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDoge3Byb2dyZXNzfSVcIiBjbGFzcz1cInNoYWRvdy1ub25lIGZsZXggZmxleC1jb2wgdGV4dC1jZW50ZXIgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC13aGl0ZSBqdXN0aWZ5LWNlbnRlciBiZy1ibHVlLTUwMFwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG57I2lmIHNob3dOZXh0fVxyXG48YnV0dG9uIG9uOmNsaWNrPXtuZXh0U2xpZGV9IGNsYXNzPVwidy1mdWxsIGgtMTIgcHgtNiB0ZXh0LWluZGlnby0xMDAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGJnLWluZGlnby03MDAgcm91bmRlZC1sZyBmb2N1czpzaGFkb3ctb3V0bGluZSBob3ZlcjpiZy1pbmRpZ28tODAwIGluZm8tdGV4dFwiPtin2YTYqtin2YTZijwvYnV0dG9uPlxyXG57L2lmfSJdLCJuYW1lcyI6WyJzdG9yZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0RBMEZrQixHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRHRCLEdBQVE7Ozs7Ozs7c0JBTG9ELEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7O3FDQUFKLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUNBRTNDLEdBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFGK0IsR0FBSTs7OzBDQUUzQyxHQUFROzs7b0JBRzdCLEdBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBckZVLE9BQU8sR0FBRSxNQUFNLElBQUcsT0FBTztNQUMxQyxPQUFPLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLElBQUk7U0FDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRzs7O0tBRTlCLE9BQU8sQ0FBQyxJQUFJLElBQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUUsQ0FBQyxHQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSTtTQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxPQUFPLENBQUMsSUFBSTs7O1VBRy9DLElBQUksRUFBQyxNQUFNLENBQUMsSUFBSSxFQUNoQixZQUFZLEVBQUMsR0FBRzs7Ozs7OztTQU9uQixPQUFPLEtBQU1BLFFBQU07OztLQUNwQixJQUFJLEdBQUcsZ0JBQWdCO09BQ2hCLElBQUksZ0JBQUMsWUFBWTtLQWN4QixRQUFRLEdBQUcsR0FBRzs7Q0FDbEIsT0FBTztFQUNILFdBQVc7OztLQUVYLFFBQVEsR0FBRyxLQUFLOztPQUNkLFdBQVc7TUFDVCxRQUFRLEdBQUcsV0FBVzs7UUFDbEIsSUFBSSxHQUFJLEdBQUcsR0FBQyxDQUFDLEdBQUUsS0FBSztvQkFDeEIsWUFBWSxJQUFFLElBQUk7b0JBQ2xCLFFBQVEsR0FBSSxZQUFZOztRQUNyQixZQUFZLElBQUcsQ0FBQztLQUNmLGFBQWEsQ0FBQyxRQUFRO0tBQ3RCLE9BQU87OztHQUViLENBQUM7Ozs7T0FFRCxPQUFPOztTQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsMENBQTBDLElBQUcsTUFBTSxTQUFTLElBQUksTUFBSyxJQUFJLFdBQVUsS0FBSztPQUMzRyxLQUFLO0lBQ0osTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUUsS0FBSyxJQUFHLElBQUksQ0FBRSxHQUFHLElBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJOzhCQUMvRCxRQUFRLENBQUMsV0FBVyxHQUFHLEtBQUs7O0tBQzVCLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLElBQUUsSUFBSSxJQUFHLElBQUksQ0FBQyxHQUFHLElBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSTtVQUNwRSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVM7dUJBQ3ZCLFFBQVEsR0FBRyxJQUFJO2dDQUNmLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSTtnQ0FDcEIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVzt1QkFDakMsSUFBSSxHQUFHLGlCQUFpQjs7Y0FFakIsSUFBSSxDQUFDLEdBQUc7Ozs7O0lBSzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEdBQUc7Ozs7O1VBSTdCLFNBQVM7TUFDWCxRQUFRLEdBQUMsQ0FBQzs7OztrQkFHYixRQUFRLEdBQUcsS0FBSztFQUNoQixJQUFJLFdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUUsQ0FBQztFQUN0QyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF6REwsTUFBTSxDQUFDLElBQUk7U0FDWixDQUFDO3FCQUFHLElBQUksR0FBRyx5QkFBeUI7O1NBRXBDLENBQUM7cUJBQUUsSUFBSSxHQUFHLHNCQUFzQjs7U0FFaEMsQ0FBQztxQkFBRyxJQUFJLEdBQUcseUJBQXlCOztTQUVwQyxDQUFDO3FCQUFHLElBQUksR0FBRyx5QkFBeUI7O1NBRXBDLENBQUM7cUJBQUcsSUFBSSxHQUFHLGdDQUFnQzs7O0tBRXZDLElBQUksQ0FBQyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
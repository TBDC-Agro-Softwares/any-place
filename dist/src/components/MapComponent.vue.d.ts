declare const _default: import("vue").DefineComponent<{}, {}, {}, {
    finalLat(): any;
    finalLng(): any;
    finalLatLng(): {
        lat: any;
        lng: any;
    };
}, {
    getRecycleKey(): string;
    resize(): void;
    resizePreserveCenter(): void;
    _resizeCallback(): void;
}, {
    props: string[];
    data(): {
        _actualResizeBus: null;
    };
    created(): void;
    methods: {
        _resizeCallback(): void;
        _delayedResizeCallback(): void;
    };
    watch: {
        resizeBus(newVal: any): void;
        '$data._actualResizeBus': (newVal: any, oldVal: any) => void;
    };
    destroyed(): void;
}, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;

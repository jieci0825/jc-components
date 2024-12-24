import type { App, Plugin, Component, AppContext } from 'vue'

export type SFCWithInstall<T> = T &
    Plugin & {
        install(app: App): void
    } & {
        name: string // 确保有 name 属性
    }

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}

/**
 * 给一个组件挂载 install 方法
 */
export const withInstall = <T extends Component>(comp: T) => {
    const _comp = comp as SFCWithInstall<T>

    _comp.install = function (app: App) {
        app.component((comp as SFCWithInstall<T>).name, comp)
    }

    return _comp
}

/**
 * 给一个函数挂载 install 方法
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
    const _fn = fn as SFCWithInstall<T>

    _fn.install = function (app: App) {
        app.config.globalProperties[name] = fn
    }

    return _fn as SFCInstallWithContext<T>
}

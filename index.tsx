/*
 * Vencord Plugin: Screenshare FPS Button (Safe UI Only)
 */

import definePlugin from "@utils/types";
import { Devs } from "@utils/constants";
import { definePluginSettings } from "@api/Settings";
import { showToast, Toasts, React } from "@webpack/common";
import { findByPropsLazy } from "@webpack";
import { Patcher } from "@utils/patcher";
const PanelButton = findByPropsLazy("PanelButton");

const settings = definePluginSettings({
    fps: {
        type: "number",
        description: "Preferred Screen Share FPS (UI only)",
        default: 30
    }
});

function FpsMenu() {
    return (
        <div style={{ padding: 10, width: 200 }}>
            <h3 style={{ marginBottom: 10 }}>Screen Share FPS</h3>

            {[15, 30, 60, 120].map(fps => (
                <div
                    key={fps}
                    style={{
                        padding: "6px 8px",
                        cursor: "pointer",
                        background: settings.store.fps === fps ? "#5865F2" : "transparent",
                        borderRadius: 6,
                        marginBottom: 4
                    }}
                    onClick={() => {
                        settings.store.fps = fps;
                        showToast(
                            `Preferred FPS set to ${fps} (Discord limits still apply)`,
                            Toasts.Type.SUCCESS
                        );
                    }}
                >
                    {fps} FPS
                </div>
            ))}
        </div>
    );
}

export default definePlugin({
    name: "ScreenshareFpsButton",
    description: "Adds a FPS button next to mute/deafen (UI only).",
    authors: [Devs.You],
    settings,

    start() {
        const AccountDetails = findByPropsLazy("AccountDetails");

        Patcher.after(AccountDetails, "default", (_, __, ret) => {
            if (!ret?.props?.children) return;

            ret.props.children.push(
                <Popout
                    position="top"
                    renderPopout={() => <FpsMenu />}
                >
                    {props => (
                        <PanelButton
                            {...props}
                            tooltipText="Screen Share FPS"
                            icon={() => (
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm1 14h-2v-2h2v2zm0-4h-2V7h2v6z"
                                    />
                                </svg>
                            )}
                        />
                    )}
                </Popout>
            );
        });
    },

    stop() {
        Patcher.unpatchAll();
    }
});

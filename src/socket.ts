import { SuccessSubscriptionResult, FailedSubscriptionResult } from "./types";

export function clientConnected(client: any) {
    client.subscriptions = [];

    function subscriptionResult(result: SuccessSubscriptionResult | FailedSubscriptionResult) {
        client.emit("subscribe-result", result);
    }

    client.on("subscribe", (cityId: number) => {
        const cityIdIndex = client.subscriptions.indexOf(cityId);
        if (cityIdIndex !== -1) {
            return subscriptionResult({
                result: "failed",
                reason: "Already subscribed!"
            });
        }
        client.subscriptions.push(cityId);
        client.join(`city-${cityId}`);
        subscriptionResult({
            result: "success",
            currentSubscriptions: client.subscriptions,
            type: "subscribe",
            cityId
        });
    });

    client.on("unsubscribe", (cityId: number) => {
        const cityIdIndex = client.subscriptions.indexOf(cityId);
        if (cityIdIndex === -1) {
            return subscriptionResult({
                result: "failed",
                reason: "Not subscribed to city!"
            });
        }
        client.leave(`city-${cityId}`);
        client.subscriptions.splice(cityIdIndex, 1);
        subscriptionResult({
            result: "success",
            currentSubscriptions: client.subscriptions,
            type: "unsubscibe",
            cityId
        });
    });
}
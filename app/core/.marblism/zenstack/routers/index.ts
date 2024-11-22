/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createPlanRouter from "./Plan.router";
import createSubscriptionRouter from "./Subscription.router";
import createConversationRouter from "./Conversation.router";
import createMessageRouter from "./Message.router";
import createTransactionRouter from "./Transaction.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PlanClientType } from "./Plan.router";
import { ClientType as SubscriptionClientType } from "./Subscription.router";
import { ClientType as ConversationClientType } from "./Conversation.router";
import { ClientType as MessageClientType } from "./Message.router";
import { ClientType as TransactionClientType } from "./Transaction.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        plan: createPlanRouter(router, procedure),
        subscription: createSubscriptionRouter(router, procedure),
        conversation: createConversationRouter(router, procedure),
        message: createMessageRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    plan: PlanClientType<AppRouter>;
    subscription: SubscriptionClientType<AppRouter>;
    conversation: ConversationClientType<AppRouter>;
    message: MessageClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
}

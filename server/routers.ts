import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { insertFeedback, listFeedback, getFeedbackCount } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  feedback: router({
    submit: publicProcedure
      .input(
        z.object({
          rating: z.number().int().min(1).max(5),
          name: z.string().max(255).optional(),
          email: z.string().email().max(320).optional().or(z.literal("")),
          comment: z.string().max(5000).optional(),
        })
      )
      .mutation(async ({ input }) => {
        await insertFeedback({
          rating: input.rating,
          name: input.name || null,
          email: input.email || null,
          comment: input.comment || null,
        });

        // Notify the owner of new feedback
        const stars = "★".repeat(input.rating) + "☆".repeat(5 - input.rating);
        const from = input.name ? input.name : "Anonymous";
        const emailLine = input.email ? ` (${input.email})` : "";
        const commentLine = input.comment ? `\n\n"${input.comment}"` : "";
        await notifyOwner({
          title: `New TrolleyRoast Feedback — ${stars}`,
          content: `From: ${from}${emailLine}${commentLine}`,
        }).catch(() => {/* non-critical */});

        return { success: true };
      }),

    list: protectedProcedure.query(async () => {
      return listFeedback(200);
    }),

    count: publicProcedure.query(async () => {
      return getFeedbackCount();
    }),
  }),
});

export type AppRouter = typeof appRouter;

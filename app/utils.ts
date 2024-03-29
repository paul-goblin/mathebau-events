import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { Admin } from "~/models/admin.server";

export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isAdmin(admin: any): admin is Admin {
  return admin && typeof admin === "object" && typeof admin.email === "string" && typeof admin.name === "string";
}

export function useOptionalAdmin(): Admin | undefined {
  const data = useMatchesData("root");
  if (!data || !isAdmin(data.admin)) {
    return undefined;
  }
  return data.admin;
}

export function useAdmin(): Admin {
  const maybeAdmin = useOptionalAdmin();
  if (!maybeAdmin) {
    throw new Error(
      "No admin found in root loader, but admin is required by useAdmin. If admin is optional, try useOptionalAdmin instead."
    );
  }
  return maybeAdmin;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
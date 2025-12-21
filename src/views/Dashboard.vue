<template>
    <div class="min-h-screen bg-[var(--color-base-bg)]">
        <div class="bg-[var(--color-base-secondary-50)] px-6 py-4 border-b border-border">
            <h1 class="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        <div class="p-6">
            <Empty>
                <EmptyMedia variant="icon">
                    <LayoutDashboard class="size-6" />
                </EmptyMedia>
                <EmptyHeader>
                    <EmptyTitle>No dashboard data</EmptyTitle>
                    <EmptyDescription>
                        Your dashboard will display important information and statistics here.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LayoutDashboard } from 'lucide-vue-next'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
</script>
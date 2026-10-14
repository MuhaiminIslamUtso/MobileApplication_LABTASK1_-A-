import { useState } from "react";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleList() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ["All", ...new Set(ARTICLES.map((a) => a.category))];

    const filteredArticles = selectedCategory
        ? ARTICLES.filter((a) => a.category === selectedCategory)
        : ARTICLES;

    const handlePress = (article: Article) => {
        router.push({
            pathname: "/(tabs)/(home)/[id]",
            params: { id: article.id },
        });
    };

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={filteredArticles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ArticleCard article={item} onPress={handlePress} />}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
                            {categories.map((cat) => {
                                const isActive = cat === "All" ? selectedCategory === null : selectedCategory === cat;
                                return (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[styles.pill, isActive && styles.activePill]}
                                        onPress={() => setSelectedCategory(cat === "All" ? null : cat)}
                                    >
                                        <Text style={[styles.pillText, isActive && styles.activePillText]}>{cat}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <Text style={styles.listHeaderText}>
                            {filteredArticles.length} stories {selectedCategory ? `- in ${selectedCategory}` : ""}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    list: { paddingTop: 12, paddingBottom: 32 },
    listHeader: { paddingHorizontal: 16, paddingBottom: 8 },
    pillScroll: { flexDirection: "row", marginBottom: 12 },
    pill: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#E2E8F0", borderRadius: 20, marginRight: 8 },
    activePill: { backgroundColor: "#0D9488" },
    pillText: { fontSize: 13, fontWeight: "600", color: "#475569" },
    activePillText: { color: "#FFFFFF" },
    listHeaderText: { fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 },
});